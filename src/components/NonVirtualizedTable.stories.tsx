import type { Meta, StoryObj } from "@storybook/react";

import { NonVirtualizedTable } from "./NonVirtualizedTable";

const meta: Meta<typeof NonVirtualizedTable> = {
  component: NonVirtualizedTable,
};

export default meta;
type Story = StoryObj<typeof NonVirtualizedTable>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-foreground mb-4">Transactions</h2>
      <NonVirtualizedTable {...args} />
    </div>
  ),
};
