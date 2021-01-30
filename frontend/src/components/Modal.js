import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";


export const CustomModal = (props) => {
  const Item = props.activeItem;
  
  const [activeItem, setActiveItem] = useState(Item);
  const handleChange = ( e ) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
          value = e.target.checked;
    }
    setActiveItem({...activeItem, [name]: value});
    console.log(activeItem);
  };

  const { toggle, onSave } = props;
  return (
    <Modal isOpen={true} toggle={toggle}>
    <ModalHeader toggle={toggle}>ToDo Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter ToDo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for='description'>Description</Label>
            <Input
              type="text"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter ToDo Description"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
            <Input
              type="checkbox"
              name="completed"
              value={activeItem.completed}
              onChange={handleChange}
            />
            Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}
