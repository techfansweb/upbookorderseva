const useCopy = async (data, ref, text) => {

    // chnage text
    ref.current.innerText = "Copying...👨‍🏭"
    await navigator.clipboard.writeText(data)

    // after 500ms change text
    setTimeout(() => {
        ref.current.innerText = text
    }, 500);
}
export default useCopy