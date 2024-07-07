import type { Meta, StoryObj } from "@storybook/react";

import { VirtualizedTable } from "./VirtualizedTable";

const meta: Meta<typeof VirtualizedTable> = {
  component: VirtualizedTable,
};

export default meta;
type Story = StoryObj<typeof VirtualizedTable>;

export const Primary: Story = {
  argTypes: {},
  args: {},
  render: (args) => (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-foreground mb-4">Transactions</h2>
      <VirtualizedTable {...args} />
    </div>
  ),
};
