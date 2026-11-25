# Allkateia Proteção Veicular

Site institucional em português com Next.js App Router, Tailwind CSS e GSAP. As páginas são exportadas como HTML estático.

## Executar localmente

Use Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para validar a exportação, execute `npm run typecheck` e `npm run build`. A pasta `out/` contém a versão estática. Configure o servidor estático para responder com `out/404.html` e status 404 em rotas inexistentes.

## Atualizar conteúdo e comportamento

- `app/content.ts` contém contatos, chamadas de WhatsApp, benefícios, passos e perguntas frequentes.
- `app/page.tsx` contém a estrutura, a experiência institucional e o acesso para associados.
- `app/partner-showcase.tsx` carrega sob demanda o CircularCarousel da React Bits e mantém a lista estática no modo leve. Os logotipos dos parceiros vêm do catálogo da Allkateia. A licença do componente está em `public/licenses/react-bits.txt`.
- `app/experience.tsx` controla o carrossel e a preferência persistida de modo leve.
- `app/motion.tsx` contém os efeitos do GSAP, incluindo a rolagem suave no desktop com mouse ou trackpad, e é carregado conforme as preferências.
- `app/preloader.ts` encerra a abertura assim que a imagem principal carrega, com limite de 720 ms e preferência pelo modo leve.
- `app/globals.css` contém os estilos e os pontos de adaptação do layout.
- O logotipo vem do site oficial. A versão azul do cabeçalho preserva o desenho do logotipo do rodapé e usa o azul do favicon oficial. O vídeo do hero e as imagens de reserva usam o clipe enviado para este projeto, com um recorte próprio para celular.
- O modo leve preserva a imagem principal otimizada e usa uma faixa nativa sem carregar o vídeo ou os efeitos. Também são respeitadas as preferências de movimento e economia de dados sinalizadas pelo navegador.

## Conteúdo da marca

O atendimento de associados segue o canal de WhatsApp divulgado no site oficial. A consulta de unidades também é encaminhada ao atendimento, pois a página oficial de unidades retornou erro durante a consulta. Valide os endereços e os limites contratuais com a Allkateia antes de acrescentá-los ao site.
