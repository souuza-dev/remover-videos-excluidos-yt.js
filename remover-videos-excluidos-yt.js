setInterval(() => {
  const videos = document.querySelectorAll('ytd-playlist-video-renderer');

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];

    const titulo = video.innerText.toLowerCase();
    const thumbnail = video.querySelector('img');
    const isExcluido = titulo.includes("vídeo indisponível") 
                    || titulo.includes("vídeo excluído") 
                    || titulo.includes("vídeo privado")  // adicionado aqui
                    || !thumbnail;

    if (isExcluido) {
      const botaoRemover = video.querySelector('ytd-menu-renderer tp-yt-paper-item');

      if (botaoRemover) {
        botaoRemover.click();
        console.log("🗑 Removido vídeo excluído ou privado.");
      } else {
        // Tenta abrir o menu e buscar "Remover"
        const menuBtn = video.querySelector('#primary button');
        if (menuBtn) {
          menuBtn.click();

          setTimeout(() => {
            const item = document.evaluate(
              '//span[contains(text(),"Remover") or contains(text(),"remover")]',
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;

            if (item) {
              item.click();
              console.log("🗑 Removido via menu.");
            } else {
              console.warn("⚠️ Menu aberto, mas item 'Remover' não encontrado.");
            }
          }, 500);
        } else {
          console.warn("⚠️ Botão de menu não encontrado — talvez o vídeo esteja totalmente quebrado.");
        }
      }

      break; 
    }
  }
}, 1500);
