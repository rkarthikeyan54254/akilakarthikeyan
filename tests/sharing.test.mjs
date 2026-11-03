import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStoryShare, prepareShareFile, sharePreparedFile } from '../src/lib/sharing.js';

const story = { title: 'அந்தக் காலத்து தீபாவளி ஆனந்தங்கள்', description: 'நினைவுகள்', url: '/stories/deepavali' };
test('Tamil share text has one clean production URL and an audio callout only for narrated stories', () => {
  const plain = buildStoryShare({ ...story, url: 'https://preview.example/stories/deepavali?tracking=1#old' });
  assert.equal(plain.canonicalUrl, 'https://akilakarthikeyan.com/stories/deepavali');
  assert.equal(plain.shareUrl, plain.canonicalUrl);
  assert.equal(new URL(plain.whatsapp).searchParams.get('text'), plain.text);
  assert.equal(plain.text.includes('🎧'), false);
  const audio = buildStoryShare({ ...story, audioUrl: '/audio/story.mp3' });
  assert.equal(audio.shareUrl, plain.canonicalUrl + '#story-audio');
  assert.ok(audio.text.includes('🎧'));
  assert.equal((audio.text.match(/https:\/\//g) || []).length, 1);
  assert.equal(new URL(audio.facebook).searchParams.get('u'), audio.shareUrl);
});
test('Tamil slugs remain correctly encoded without corrupting Unicode', () => {
  const result = buildStoryShare({ ...story, url: '/stories/பொய்யும்-மெய்யும்' });
  assert.equal(decodeURIComponent(new URL(result.facebook).searchParams.get('u')), 'https://akilakarthikeyan.com/stories/பொய்யும்-மெய்யும்');
});
test('media preparation preserves the exact bytes, filename and type', async () => {
  const bytes = new Uint8Array([73, 68, 51, 9]);
  const file = await prepareShareFile('https://example.com/audio/story.mp3', async () => new Response(bytes, { headers: { 'content-type': 'audio/mpeg' } }));
  assert.equal(file.name, 'story.mp3');
  assert.equal(file.type, 'audio/mpeg');
  assert.deepEqual(new Uint8Array(await file.arrayBuffer()), bytes);
});
test('failed requests, empty files, and HTML responses never become share files', async () => {
  for (const response of [new Response('missing', { status: 404 }), new Response('', { headers: { 'content-type': 'audio/mpeg' } }), new Response('<html>error</html>', { headers: { 'content-type': 'text/html' } })]) {
    await assert.rejects(prepareShareFile('https://example.com/audio.mp3', async () => response));
  }
});
test('native sharing is invoked immediately with a prepared file and the story link', async () => {
  const file = new File(['audio'], 'story.mp3', { type: 'audio/mpeg' });
  let shared;
  const nav = { canShare: data => data.files[0] === file, share: data => { shared = data; return Promise.resolve(); } };
  const operation = sharePreparedFile(file, { title: story.title, text: 'story link' }, nav);
  assert.equal(shared.files[0], file);
  assert.equal(shared.text, 'story link');
  assert.equal(await operation, 'shared');
});
test('unsupported targets, cancellation, and real failures are distinct', async () => {
  const file = new File(['audio'], 'story.mp3', { type: 'audio/mpeg' });
  assert.equal(await sharePreparedFile(file, story, {}), 'unsupported');
  assert.equal(await sharePreparedFile(file, story, { canShare: () => false, share: () => assert.fail() }), 'unsupported');
  assert.equal(await sharePreparedFile(file, story, { canShare: () => true, share: async () => { throw new DOMException('Cancelled', 'AbortError'); } }), 'cancelled');
  await assert.rejects(sharePreparedFile(file, story, { canShare: () => true, share: async () => { throw new DOMException('Denied', 'NotAllowedError'); } }), { name: 'NotAllowedError' });
});
