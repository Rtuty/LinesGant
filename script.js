const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight


const elements = {}
const num = 7
const size = 100
let current = null

for (let i = 0; i < num; i++) {
    const element = document.createElement('div')
    element.addEventListener('mousedown', onMouseDown)
    const id = 'el' + i
    element.id = id
    document.body.prepend(element)

    elements[id] = {
        x: Math.random() * (width - size),
        y: Math.random() * (height - size),
        startX: 0,
        startY: 0
    }

    translate(element, elements[id].x, elements[id].y)
}

connect(elements)

function onMouseDown(e) {
    e.preventDefault()
    elements[e.target.id].startX = e.x - elements[e.target.id].x
    elements[e.target.id].startY = e.y - elements[e.target.id].y

    current = e.target

    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
    const x = elements[current.id].x = e.x - elements[current.id].startX
    const y = elements[current.id].y = e.y - elements[current.id].startY

    translate(current, x, y)
    connect(elements)
}

function onMouseUp() {
    document.body.removeEventListener('mousemove', onMouseMove)
    document.body.removeEventListener('mouseup', onMouseUp)
}


function translate(el, x, y) {
    el.style.transform = `translate(${x}px, ${y}px)`
}

function connect(elements) {
    context.clearRect(0, 0, width, height)

    for (let i = 0; i < num - 1; i++) {
        drawLine(
            elements['el' + i].x,
            elements['el' + (i + 1)].x,
            elements['el' + i].y,
            elements['el' + (i + 1)].y
        )
    }
}


function drawLine(x1, x2, y1, y2) {
    context.beginPath()
    context.moveTo(x1 + size / 2, y1 + size / 2)
    context.lineTo(x2 + size / 2, y2 + size / 2)
    context.stroke()
}


onresize = () => {
    width = canvas.width = innerWidth
    height = canvas.height = innerHeight
    connect(elements)
}