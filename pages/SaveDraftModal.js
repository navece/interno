import React from "react";
import { Button, Icon, Modal, Input } from "semantic-ui-react";

export default function SaveDraftModal({
  handleClose,
  handleCreate,
  handleInput,
  handleOpen,
  open,
}) {
  return (
    <Modal
      size="tiny"
      closeIcon
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <Modal.Content>
        <Input placeholder="Enter name of file" onChange={handleInput} />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button primary onClick={handleCreate}>
          <Icon name="checkmark" /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
