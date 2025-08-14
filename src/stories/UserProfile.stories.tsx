import type { Meta, StoryObj } from "@storybook/react";
import UserProfile from "../components/UserProfile";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const meta: Meta<typeof UserProfile> = {
  title: "Components/UserProfile",
  component: UserProfile,
};
export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/users/1"]}>
      <Routes>
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </MemoryRouter>
  ),
};
