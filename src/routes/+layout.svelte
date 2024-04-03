<script>
    import '../app.css'
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                console.log(navigation)
                resolve();
                await navigation.complete;
            });
        });
    });
</script>
  
<slot />

<style>
    :root::view-transition-old(root) {
	    animation-duration: 1000ms;
    }

    :root::view-transition-new(root) {
	    animation-duration: 1000ms;
    }
</style>

  <slot />