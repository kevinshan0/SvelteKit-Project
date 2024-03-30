import { readable } from 'svelte/store';
import { onMount } from 'svelte';

export default mouse = readable('ns', (set) =>  {
    onMount(() => {
        addEventListener('wheel', wheelHandler);
        addEventListener('keydown', keyHandler);
    })

    async function wheelHandler(event) {
        removeEventListener('wheel', wheelHandler);

        if (event.deltaY > 0) {
            set('down');
        } else {
            set('up');
        }

        await timeout(300);
        addEventListener('wheel', wheelHandler);
    }

    async function keyHandler(event) {
        removeEventListener('wheel', wheelHandler);

        if (event.keyCode == 38) {
            set('up');
        } else if (event.keyCode == 40) {
            set('down');
        }

        await timeout(300);
        addEventListener('wheel', wheelHandler);
    }

    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }
})