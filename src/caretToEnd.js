let isDefined = (value) => {
  return typeof value !== 'undefined' && value !== null
}

let getNodeType = (el) => {
  return (el.tagName || el.nodeName).toLowerCase()
}

let isTextarea = (el) => {
  return getNodeType(el) === 'textarea'
}

let isContentEditable = (el) => {
  if (getNodeType(el) === 'div') {
    let attr = el.getAttribute('contenteditable')
    return isDefined(attr) && attr !== 'false'
  }

  return false
}

let caretToEndInTextarea = (el) => {
  el.focus()
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.selectionEnd = el.value.length
  } else if (typeof el.createTextRange !== 'undefined') {
    el.focus()
    var range = el.createTextRange()
    range.collapse(false)
    range.select()
  }
}

let caretToEndInContentEditable = (el) => {
  el.focus()
  var range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  var sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

let caretToEnd = (el) => {
  if (isTextarea(el)) {
    caretToEndInTextarea(el)
  } else if (isContentEditable(el)) {
    caretToEndInContentEditable(el)
  } else {
    console.error('Unsupported element type', getNodeType(el))
  }
}

export default caretToEnd
