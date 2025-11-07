
      (function(){
        const inputs = Array.from(document.querySelectorAll('#foodMenu input[type="number"]'));
        const totalEl = document.getElementById('totalPrice');
        const buyBtn  = document.getElementById('buyFood');

        // Formato € local ES
        const fmt = new Intl.NumberFormat('es-ES', { style:'currency', currency:'EUR' });

        function clamp(val, min, max){
          return Math.min(max, Math.max(min, val));
        }

        function recalc(){
          let total = 0;
          inputs.forEach(inp=>{
            const price = Number(inp.dataset.price) || 0;
            const qty   = Number(inp.value) || 0;
            total += price * qty;
          });
          totalEl.textContent = fmt.format(total);
          // habilitar/deshabilitar CTA
          if(total > 0){
            buyBtn.classList.remove('disabled');
            buyBtn.removeAttribute('disabled');
          }else{
            buyBtn.classList.add('disabled');
            buyBtn.setAttribute('disabled','true');
          }
        }

        // Limita 0–15 y recalcula
        inputs.forEach(inp=>{
          inp.addEventListener('input', ()=>{
            const v = clamp(parseInt(inp.value || '0', 10), parseInt(inp.min||'0',10), parseInt(inp.max||'15',10));
            if(String(v) !== inp.value) inp.value = v;
            recalc();
          });
          inp.addEventListener('change', recalc);
        });

        // Stepper botones
        document.querySelectorAll('.step-btn').forEach(btn=>{
          btn.addEventListener('click', ()=>{
            const id  = btn.dataset.target;
            const el  = document.getElementById(id);
            if(!el) return;
            const min = parseInt(el.min||'0',10);
            const max = parseInt(el.max||'15',10);
            let v = parseInt(el.value||'0',10);
            v += btn.classList.contains('plus') ? 1 : -1;
            el.value = clamp(v, min, max);
            el.dispatchEvent(new Event('input', {bubbles:true}));
          });
        });

        recalc();

        // Burger móvil
        const burger = document.querySelector('.burger');
        const menu   = document.getElementById('menu_pr');
        if(burger && menu){
          burger.addEventListener('click', ()=>{
            const open = menu.classList.toggle('menu-show');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          menu.querySelectorAll('a').forEach(a=>{
            a.addEventListener('click', ()=> menu.classList.remove('menu-show'));
          });
        }

        // Header scrolled
        const header = document.querySelector('.site-header');
        const onScroll = () => {
          if(window.scrollY > 8){ header.classList.add('scrolled'); }
          else { header.classList.remove('scrolled'); }
        };
        onScroll();
        window.addEventListener('scroll', onScroll);

        // Evita submit real (si aún no integras pasarela)
        document.getElementById('form').addEventListener('submit', (e)=>{
          if(buyBtn.classList.contains('disabled')) e.preventDefault();
        });
      })();
