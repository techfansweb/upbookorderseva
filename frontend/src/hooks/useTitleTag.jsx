const useTitleTag = (title) => {

    const tag = document.getElementsByTagName("title").item(0)
    tag.innerText = title
}

export default useTitleTag