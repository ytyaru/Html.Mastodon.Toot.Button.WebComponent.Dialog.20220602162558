window.addEventListener('DOMContentLoaded', async (event) => {
    console.debug('DOMContentLoaded!!');
    document.getElementById('toot-button').addEventListener('click', (event) => {
        document.getElementById('toot-dialog').showModal();
        const status = document.getElementById('status');
        if ('init' in status.dataset) { status.value = status.dataset.init }
        status.value += '\n' + location.href
        status.focus();
        status.setSelectionRange(0, 0);

        /*
        status.focus();
        status.setSelectionRange(status.value.length, status.value.length);
        */
    });

});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

