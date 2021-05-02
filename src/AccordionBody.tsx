import React from 'react';

type AccordionBodyPropsType = {
    collapsed: boolean
}

function AccordionBody(props: any) {
    console.log("AccordionBody rendering")
    return <div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
}

export default AccordionBody;