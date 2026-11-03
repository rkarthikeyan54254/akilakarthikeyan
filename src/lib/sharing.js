const SITE_URL = 'https://akilakarthikeyan.com';

export function buildStoryShare({ title, url, description = '', audioUrl }) {
  const canonicalUrl = new URL(new URL(url, SITE_URL).pathname, SITE_URL).href;
  const shareUrl = canonicalUrl + (audioUrl ? '#story-audio' : '');
  const text = [title, description, audioUrl ? '🎧 குரல் பதிவுடன் — கதையை வாசிக்கவும், கேட்கவும்.' : '', shareUrl].filter(Boolean).join('\n\n');
  return {
    canonicalUrl, shareUrl, text,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };
}

export async function prepareShareFile(url, fetchFile = fetch) {
  const response = await fetchFile(url);
  if (!response.ok) throw new Error('Media could not be loaded');
  const blob = await response.blob();
  if (!blob.size || !/^(image|audio)\//.test(blob.type)) throw new Error('Invalid media file');
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'story-media');
  return new File([blob], filename, { type: blob.type });
}

export async function sharePreparedFile(file, { title, text }, shareNavigator = navigator) {
  if (!shareNavigator.share || !shareNavigator.canShare?.({ files: [file] })) return 'unsupported';
  try {
    await shareNavigator.share({ files: [file], title, text });
    return 'shared';
  } catch (error) {
    if (error.name === 'AbortError') return 'cancelled';
    throw error;
  }
}
