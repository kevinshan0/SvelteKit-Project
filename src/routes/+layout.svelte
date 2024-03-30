<script>
    import '../app.css'

    import { onNavigate } from '$app/navigation';

    // page transitions
    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
  </script>

  <h1>HELLO</h1>

  <slot />