import { html } from 'lit-html'

let mainButtons = (buttonsArray) => 
    buttonsArray.map((path, index) => {
        return (
            html`<a class="btn btn-primary btn-lg btn-block lower-bottom" style="background-color: #93cc76; border: none" href='/${buttonsArray[index][0]}'>${buttonsArray[index][1]}</a>`
        )
    })

export { mainButtons }