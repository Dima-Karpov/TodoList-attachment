import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AppWithRedux } from '../../AppWithRedux';
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

