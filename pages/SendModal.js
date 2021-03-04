import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

export default function SendModal({ html }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button primary>Send</Button>}
    >
      <Modal.Header>HTML Content</Modal.Header>
      <Modal.Content scrolling>
        <p>{html}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Confirm <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
