window.addEventListener('DOMContentLoaded', async (event) => {
    console.debug('DOMContentLoaded!!');
    document.getElementById('toot-button').addEventListener('click', (event) => {
        document.getElementById('toot-dialog').showModal();
        const status = document.getElementById('status');
        if ('init' in status.dataset) { status.innerHTML = status.dataset.init }
        status.innerHTML += '<br>' + location.href
        status.focus();
        setCaretStart(status)
        document.getElementById('status').dispatchEvent(new Event('input'))
    });
    document.getElementById('status').addEventListener('input', (event) => {
        const LIMIT = 500
        const remaining = LIMIT - event.target.innerText.length
        console.log(remaining )
        document.getElementById('status-remaining').textContent = remaining;
        console.log(event.target.innerText)
    });
    function setCaretStart(target) {
        //status.setSelectionRange(0, 0);
        var range = document.createRange()
        var sel = window.getSelection()
        range.setStart(target.childNodes[0], 0)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
    }
});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

