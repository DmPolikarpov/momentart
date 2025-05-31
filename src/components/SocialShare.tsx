import React from 'react';
import { Share2 } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  excerpt?: string;
  url: string;
}

const SocialShare = ({ title, excerpt, url }: SocialShareProps) => {
//   const { toast } = useToast();

  const shareData = {
    title,
    text: excerpt || title,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(url);
    // toast({
    //   title: "Link copied!",
    //   description: "Article link copied to clipboard",
    // });
  };

  const shareToSocial = (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(excerpt || title);

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        title="Share article"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>
      
      <div className="flex space-x-2">
        <button
          onClick={() => shareToSocial('twitter')}
          className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
          title="Share on Twitter"
        >
          𝕏
        </button>
        <button
          onClick={() => shareToSocial('facebook')}
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          title="Share on Facebook"
        >
          f
        </button>
        <button
          onClick={() => shareToSocial('linkedin')}
          className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
          title="Share on LinkedIn"
        >
          in
        </button>
        <button
          onClick={() => shareToSocial('pinterest')}
          className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          title="Share on Pinterest"
        >
          P
        </button>
      </div>
    </div>
  );
};

export default SocialShare;