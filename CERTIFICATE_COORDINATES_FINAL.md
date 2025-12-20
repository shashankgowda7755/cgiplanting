# Certificate Positioning - Final Coordinates

## Copy-Paste Ready Coordinates for Certificate Elements

Use these exact values to position elements on the certificate template.

---

## 📸 Profile Photo

```css
position: absolute;
top: 45.1%;
left: 44.2%;
transform: translate(-50%, -50%);
width: 62%;
aspect-ratio: 1;
border-radius: 50%;
overflow: hidden;
border: 4px solid white;
z-index: 10;
```

### React/JSX Implementation:
```jsx
<div style={{ 
  position: 'absolute', 
  top: '45.1%', 
  left: '44.2%', 
  transform: 'translate(-50%, -50%)', 
  width: '62%', 
  aspectRatio: '1', 
  borderRadius: '50%', 
  overflow: 'hidden', 
  border: '4px solid white', 
  zIndex: 10 
}}>
  <img 
    src={photoUrl} 
    alt="Profile photo" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  />
</div>
```

---

## 👤 First Name

```css
position: absolute;
left: 65%;
top: 23.5%;
color: white;
font-weight: 900;
font-size: 30px;
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
z-index: 15;
width: 35%;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
line-height: 1;
```

### React/JSX Implementation:
```jsx
<div style={{ 
  position: 'absolute', 
  left: '65%', 
  top: '23.5%', 
  color: 'white', 
  fontWeight: '900', 
  fontSize: '30px', 
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
  zIndex: 15, 
  width: '35%', 
  overflow: 'hidden', 
  whiteSpace: 'nowrap', 
  textOverflow: 'ellipsis', 
  lineHeight: '1' 
}}>
  {firstName}
</div>
```

---

## 👤 Last Name

```css
position: absolute;
left: 73%;
top: 28.5%;
color: white;
font-weight: 900;
font-size: 30px;
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
z-index: 15;
width: 28%;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
line-height: 1;
```

### React/JSX Implementation:
```jsx
<div style={{ 
  position: 'absolute', 
  left: '73%', 
  top: '28.5%', 
  color: 'white', 
  fontWeight: '900', 
  fontSize: '30px', 
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
  zIndex: 15, 
  width: '28%', 
  overflow: 'hidden', 
  whiteSpace: 'nowrap', 
  textOverflow: 'ellipsis', 
  lineHeight: '1' 
}}>
  {lastName}
</div>
```

---

## 📊 Quick Reference Table

| Element | Left | Top | Width | Font Size | Special Notes |
|---------|------|-----|-------|-----------|---------------|
| **Photo** | 44.2% | 45.1% | 62% | - | Circular, 4px white border |
| **First Name** | 65% | 23.5% | 35% | 30px | Wider to accommodate long names |
| **Last Name** | 73% | 28.5% | 28% | 30px | Standard width |

**Spacing between names**: 5% (28.5% - 23.5% = 5%)

---

## 🎨 Complete Certificate Container

```jsx
<div 
  ref={certificateRef} 
  className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8" 
  style={{ backgroundColor: '#1a365d' }}
>
  {/* Background Template */}
  <img 
    src="/certificate-template.jpg" 
    alt="Certificate" 
    className="w-full h-full object-cover" 
    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} 
  />
  
  {/* Profile Photo */}
  {photoUrl && (
    <div style={{ 
      position: 'absolute', 
      top: '45.1%', 
      left: '44.2%', 
      transform: 'translate(-50%, -50%)', 
      width: '62%', 
      aspectRatio: '1', 
      borderRadius: '50%', 
      overflow: 'hidden', 
      border: '4px solid white', 
      zIndex: 10 
    }}>
      <img 
        src={photoUrl} 
        alt="Your photo" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
  )}
  
  {/* First Name */}
  <div style={{ 
    position: 'absolute', 
    left: '65%', 
    top: '23.5%', 
    color: 'white', 
    fontWeight: '900', 
    fontSize: '30px', 
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
    zIndex: 15, 
    width: '35%', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap', 
    textOverflow: 'ellipsis', 
    lineHeight: '1' 
  }}>
    {firstName}
  </div>
  
  {/* Last Name */}
  <div style={{ 
    position: 'absolute', 
    left: '73%', 
    top: '28.5%', 
    color: 'white', 
    fontWeight: '900', 
    fontSize: '30px', 
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
    zIndex: 15, 
    width: '28%', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap', 
    textOverflow: 'ellipsis', 
    lineHeight: '1' 
  }}>
    {lastName}
  </div>
</div>
```

---

## 🔧 Key Design Decisions

### Photo Positioning
- **Center point** (44.2%, 45.1%) perfectly aligns with the outer colorful SDG wheel
- **62% width** fills the entire outer circle without overlapping other elements
- **4px border** creates visual separation from the template

### First Name
- **65% left** position starts earlier to accommodate longer names
- **35% width** provides maximum space without overlapping photo
- **23.5% top** overlays the "Mr." position on the template

### Last Name
- **73% left** position aligns with standard template spacing
- **28% width** adequate for most last names
- **28.5% top** positioned with 5% gap below first name (tight spacing)

### Font Styling
- **30px** font size is optimized for readability
- **900 weight** ensures bold, prominent display
- **Text shadow** improves visibility against various backgrounds
- **Line height: 1** creates tight, compact text for close spacing

---

## ✅ Usage Instructions

1. **Copy the coordinates** from the tables above
2. **Paste directly** into your component's inline styles
3. **Replace variables**: Use `{firstName}`, `{lastName}`, `{photoUrl}` with your data
4. **Test with long names** to ensure ellipsis works correctly

---

**Last Updated**: December 20, 2025  
**Template**: `certificate-template.jpg` (3:4 aspect ratio)  
**Status**: ✅ Production Ready
