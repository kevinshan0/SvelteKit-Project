<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
    import { state } from '$lib/stores/scroll.js'

    let place = $page.params.place;
    let places = [
        'Hokkaido',
        'Kyoto',
        'Osaka',
        'Tokyo'
    ]

    onMount(() => {
        addEventListener('wheel', update);
        addEventListener('keydown', update);

        async function update(e) {
            let targetURLNext = `../${places[$state + 1]}`;
            let targetURLPrevious = `../${places[$state - 1]}`;
            let direction;

            // determine direction
            switch (e.type) {
                case 'wheel':
                    if (e.deltaY > 0) direction = 'up';
                    if (e.deltaY < 0) direction = 'down';
                case 'keydown':
                    if (e.keyCode == 40) direction = 'up';
                    if (e.keyCode == 38) direction = 'down';
            }

            // change page and update state
            switch (direction) {
                case 'down':
                    goto(targetURLNext);
                    state.update(n => (n + 1) % place.length);
                case 'up':
                    goto(targetURLPrevious);
                    state.update(n => (places.length + n - 1) % places.length);
            }
        }
    });

    beforeNavigate(() => {
        removeEventListener('wheel', update);
        removeEventListener('keydown', update);
    })

    afterNavigate(() => {
        addEventListener('wheel', update);
        addEventListener('keydown', update);
    })
</script>

<div>{place}</div>