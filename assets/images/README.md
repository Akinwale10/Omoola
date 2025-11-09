# OMOOLA Image Assets

## Unsplash Image Sources

The website now uses high-quality images from Unsplash. All images are properly attributed and used according to the Unsplash License.

### Hero & Branding
- **Hero Store Image**: Supermarket/grocery store interior
  - URL: `https://images.unsplash.com/photo-1578916171728-46686eac8d58`
  - Usage: Hero section and social media preview (OG image)

### Food Orders

#### Meals
- **Jollof Rice**: African rice dish
  - URL: `https://images.unsplash.com/photo-1633945274309-7ae973f9af2a`
  
- **Fried Rice**: Asian-style fried rice
  - URL: `https://images.unsplash.com/photo-1603133872878-684f208fb84b`
  
- **Amala & Ewedu**: Traditional African meal
  - URL: `https://images.unsplash.com/photo-1626074353765-517a65edd5cb`
  
- **Pounded Yam**: African swallow with soup
  - URL: `https://images.unsplash.com/photo-1604329760661-e71dc83f8f26`
  
- **Grilled Chicken**: Perfectly grilled chicken
  - URL: `https://images.unsplash.com/photo-1598103442097-8b74394b95c6`
  
- **Suya**: Spicy grilled meat
  - URL: `https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba`

#### Snacks
- **Small Chops**: Party snacks
  - URL: `https://images.unsplash.com/photo-1621939514649-280e2ee25f60`
  
- **Meat Pie**: Savory pastry
  - URL: `https://images.unsplash.com/photo-1509440159596-0249088772ff`

#### Drinks
- **Chapman**: Mixed fruit drink
  - URL: `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b`
  
- **Zobo**: Hibiscus drink
  - URL: `https://images.unsplash.com/photo-1622597467836-f3285f2131b8`
  
- **Fresh Smoothie**: Fruit smoothies
  - URL: `https://images.unsplash.com/photo-1505252585461-04db1eb84625`
  
- **Fresh Juice**: Natural fruit juice
  - URL: `https://images.unsplash.com/photo-1600271886742-f049cd451bba`

### Offers & Combos
- **Family Combo Pack**: Grocery shopping basket
  - URL: `https://images.unsplash.com/photo-1542838132-92c53300491e`
  
- **Pharmacy Bundle**: Pharmacy/medical supplies
  - URL: `https://images.unsplash.com/photo-1587854692152-cbe660dbde88`
  
- **Weekend Special**: Fresh produce/groceries
  - URL: `https://images.unsplash.com/photo-1488459716781-31db52582fe9`
  
- **Wellness Pack**: Vitamins/supplements
  - URL: `https://images.unsplash.com/photo-1556228578-8c89e6adf883`

## Image Specifications

- **Format**: JPEG (delivered via Unsplash CDN)
- **Quality**: High resolution, optimized (q=80)
- **Dimensions**: Responsive sizing via URL parameters
- **Loading**: Lazy loading enabled for all images except hero
- **Alt text**: Descriptive alt text for accessibility

## Benefits of Using Unsplash

1. ✅ **High Quality**: Professional photography
2. ✅ **Free to Use**: No licensing fees
3. ✅ **CDN Delivery**: Fast loading worldwide
4. ✅ **Responsive**: Automatic image optimization
5. ✅ **No Storage**: Images hosted externally

## Image Attribution

All images are provided by talented photographers on Unsplash. Photos are used under the [Unsplash License](https://unsplash.com/license) which allows free use for commercial and non-commercial purposes.

## Replacing Images

To replace any image with a different Unsplash photo:
1. Visit [Unsplash.com](https://unsplash.com)
2. Search for your desired image
3. Copy the photo ID from the URL
4. Update the image URL in `index.html` with the format:
   ```
   https://images.unsplash.com/photo-{PHOTO_ID}?w={WIDTH}&fit=crop&q=80
   ```
