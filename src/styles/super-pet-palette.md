# 🎨 Paleta Oficial — Super Pet System

## Cores Principais

| Elemento | Cor | HEX | Uso |
|----------|-----|-----|-----|
| Primária (Teal) | 🟩 | `#0E6A6B` | Botões, header, menus |
| Teal Light | 🟩 | `#1A8A8D` | Hover estados |
| Teal Dark | 🟩 | `#0A4A4B` | Estados ativos |
| Secundária (Orange) | 🟧 | `#E47B24` | Destaques, ícones, CTA |
| Orange Light | 🟧 | `#E8984A` | Hover states |
| Orange Dark | 🟧 | `#B85D1D` | Estados pressionados |
| Ice White | ⚪ | `#F8F5EE` | Texto principal, cards |
| Off White | 🟨 | `#F2EBDD` | Fundo principal |
| Dark Black | ⚫ | `#1E1E1E` | Texto escuro |

## Diretrizes de Uso

### Primária (#0E6A6B)
- ✅ Botões principais (contained)
- ✅ Header e navbar
- ✅ Links ativos
- ✅ Ícones principais
- ✅ Cards de destaque

### Secundária (#E47B24)
- ✅ Botões de destaque (CTA)
- ✅ Badges e chips
- ✅ Ícones de ação
- ✅ Bordas de foco
- ✅ Estados de hover secundários

### Backgrounds
- **#F2EBDD** (Off White): Fundo da página principal
- **#F8F5EE** (Ice White): Cards, modais, paper

### Textos
- **#1E1E1E** (Dark Black): Texto principal
- **#F8F5EE** (Ice White): Texto em fundos escuros
- **#6B6B6B**: Texto secundário/muted

## Classes Tailwind Customizadas

```css
/* Usar estas classes ao invés de criar novas */
bg-primary    /* #0E6A6B */
bg-secondary  /* #E47B24 */
bg-off-white  /* #F2EBDD */
bg-ice-white   /* #F8F5EE */
text-dark      /* #1E1E1E */
```

## Integração MUI

O tema MUI está configurado em `src/theme/mui-theme.ts` com estas cores.
Use sempre a props `color="primary"` ou `color="secondary"` nos componentes MUI.

## Exemplos de Aplicação

### Botões
```tsx
// Primário (Teal)
<Button variant="contained" color="primary">Confirmar</Button>

// Secundário (Orange)  
<Button variant="contained" color="secondary">Destaque</Button>

// Outline
<Button variant="outlined" color="primary">Cancelar</Button>
```

### Cards
```tsx
<Card sx={{ bgcolor: 'background.paper' }}>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
</Card>
```

### Tipografia
```tsx
<Typography variant="h1" color="text.primary">
  Título Principal
</Typography>
```

