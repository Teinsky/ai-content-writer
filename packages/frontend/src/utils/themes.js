// ai-content-writer/packages/frontend/src/utils/themes.js

// REFINED: Hệ thống màu sắc được định nghĩa lại để hài hòa và chuyên nghiệp hơn.
// Mỗi theme có màu chính (gradient), màu nền (bg), và màu nhấn (accent).

export const THEMES = {
  ocean: {
    name: 'Ocean Blue',
    gradient: 'from-sky-500 to-blue-600',
    bg: 'bg-blue-600',
    accent: 'text-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  sunset: {
    name: 'Sunset Orange',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-orange-600',
    accent: 'text-orange-500',
    button: 'bg-orange-600 hover:bg-orange-700',
  },
  forest: {
    name: 'Forest Green',
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-green-600',
    accent: 'text-green-500',
    button: 'bg-green-600 hover:bg-green-700',
  },
  midnight: {
    name: 'Midnight Purple',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-purple-600',
    accent: 'text-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700',
  },
  cherry: {
    name: 'Cherry Pink',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-pink-600',
    accent: 'text-pink-500',
    button: 'bg-pink-600 hover:bg-pink-700',
  },
};

export const CONTENT_TYPES = [
  { id: 'blog', label: '📝 Blog Post', desc: 'Bài blog chất lượng cao', color: 'from-blue-500 to-sky-500' },
  { id: 'social', label: '📱 Social Media', desc: 'Bài đăng mạng xã hội', color: 'from-pink-500 to-rose-500' },
  { id: 'email', label: '📧 Email Campaign', desc: 'Email marketing hiệu quả', color: 'from-orange-500 to-amber-500' },
  { id: 'product', label: '🛍️ Product Desc', desc: 'Mô tả sản phẩm', color: 'from-green-500 to-emerald-500' },
  { id: 'ads', label: '📢 Quảng Cáo', desc: 'Bản sao quảng cáo', color: 'from-red-500 to-rose-500' },
  { id: 'seo', label: '🔍 SEO Content', desc: 'Nội dung tối ưu SEO', color: 'from-purple-500 to-violet-500' },
];
