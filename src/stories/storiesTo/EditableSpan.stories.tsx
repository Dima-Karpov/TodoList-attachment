import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from '@storybook/addon-actions';
import { EditableSpan, EditableSpanPropsType } from '../../components/EditableSpan/EditableSpan';

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan changed',
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan',
        },
    },
} as Meta;



const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle: action('Value EditableSpan change')
};

