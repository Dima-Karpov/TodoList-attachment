import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AddItemFrom, AddItemPropsType } from '../../AddItemFrom';
import {action} from '@storybook/addon-actions'

export default {
  title: 'TODOLIST/AddItemFrom',
  component: AddItemFrom,
  argTypes: {
   onclick: {
     description: 'Button clicked incside component',
   },
  },
} as Meta;

const Template: Story<AddItemPropsType> = (args) => <AddItemFrom {...args} />;

export const AddItemFromExample = Template.bind({});
AddItemFromExample.args = {
  addItem: action('Button clicked incside component')
};

