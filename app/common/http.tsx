// export const apiUrl = 'http://127.0.0.1:8000/api'
export const apiUrl = 'https://ecommerce.softnovait.com/api/'

// export const localBaseUrl = 'http://127.0.0.1:8000'
export const localBaseUrl = 'https://ecommerce.softnovait.com'

export const adminToken = () => {
    // const data = JSON.parse(localStorage.getItem('adminInfo'))
    const data = "2|r6EQ0b7ZJsjcXddVjdVB8WYFSZNfX8RUb3DjzYZwfacb73b7";
    return data;
}


// Safe image URL helper
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';  
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/storage/')) return `${localBaseUrl}${imagePath}`;
  return `${localBaseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

// Safe placeholder image for SSR
export const getPlaceholderImage = (width: number = 48, height: number = 48, text: string = 'No Image'): string => {
  // Use SVG data URL that works on both server and client
  return `data:image/svg+xml;base64,${Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" 
            text-anchor="middle" dy=".3em" fill="#9ca3af">${text}</text>
    </svg>
  `).toString('base64')}`;
};