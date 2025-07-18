# Guia de Deploy - Audace Website

## Preparação para Produção

### 1. Otimização de Assets

Antes do deploy, execute as seguintes otimizações:

```bash
# Minificar CSS
npx clean-css-cli -o style.min.css style.css

# Minificar JavaScript
npx terser script.js -o script.min.js

# Otimizar imagens
npx imagemin *.jpg *.png --out-dir=optimized/
```

### 2. Configuração de Headers

Configure os seguintes headers no servidor:

```apache
# .htaccess para Apache
<IfModule mod_headers.c>
    # Cache de assets estáticos
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
    
    # Compressão Gzip
    <FilesMatch "\.(css|js|html)$">
        Header set Content-Encoding gzip
    </FilesMatch>
    
    # Security Headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### 3. Deploy em Netlify

1. Conecte seu repositório Git
2. Configure as build settings:
   - Build command: `npm run build` (se usando build tools)
   - Publish directory: `./`
3. Configure redirects em `_redirects`:
   ```
   /*    /index.html   200
   ```

### 4. Deploy em Vercel

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 5. Configuração de DNS

Configure os seguintes registros DNS:

```
A     @     192.0.2.1
CNAME www   yourdomain.com
```

### 6. SSL Certificate

Certifique-se de que o SSL está configurado:
- Let's Encrypt (gratuito)
- Cloudflare SSL
- SSL do provedor de hosting

### 7. Monitoramento

Configure ferramentas de monitoramento:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Google Search Console -->
<meta name="google-site-verification" content="verification_code" />
```

## Checklist de Deploy

- [ ] Minificação de CSS e JS
- [ ] Otimização de imagens
- [ ] Configuração de cache headers
- [ ] SSL certificate ativo
- [ ] Google Analytics configurado
- [ ] Google Search Console verificado
- [ ] Sitemap.xml criado
- [ ] Robots.txt configurado
- [ ] Teste de performance (Lighthouse)
- [ ] Teste de acessibilidade
- [ ] Teste em diferentes dispositivos
- [ ] Backup dos arquivos originais

## Manutenção Pós-Deploy

### Atualizações Regulares

1. **Conteúdo**: Atualizar blog e portfólio mensalmente
2. **Segurança**: Verificar vulnerabilidades trimestralmente
3. **Performance**: Auditoria semestral com Lighthouse
4. **SEO**: Monitoramento contínuo no Search Console

### Backup Strategy

```bash
# Backup automático diário
0 2 * * * rsync -av /var/www/html/ /backup/website/$(date +\%Y\%m\%d)/
```

### Monitoring Scripts

```javascript
// Error tracking
window.addEventListener('error', function(e) {
    // Send error to monitoring service
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
    }, 0);
});
```

