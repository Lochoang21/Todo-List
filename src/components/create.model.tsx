'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate }  from 'swr';
interface IProps {
    showModelCreate: boolean;
    setShowModelCreate: (value: boolean) => void;
}

function CreateModel(props: IProps) {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const { showModelCreate, setShowModelCreate } = props;

    const handleSubmitForm = () => {

        if(!title){
            toast.error("Vui lòng nhập tiêu đề!");
            return;
        }
        if(!content){
            toast.error("Vui lòng nhập nội dung!");
            return;
        }
        if(!startTime){
            toast.error("Vui lòng chọn thời gian bắt đầu!");
            return;
        }
        if(!endTime){
            toast.error("Vui lòng chọn thời gian kết thúc!");
            return;
        }
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, completed, startTime, endTime})
        }).then(res => res.json())
            .then(res => {
                if(res){
                    toast.success("Tạo mới thành công ! ");
                    handleCloseModel();
                    mutate("http://localhost:8000/todos");
                }
            });
    }
    const handleCloseModel = () => {
        setTitle("");
        setContent("");
        setStartTime("");
        setEndTime("");
        setShowModelCreate(false);
    }
    return (
        <>

            <Modal
                show={showModelCreate}
                onHide={() => handleCloseModel()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" 
                                value={title} onChange={(event) => { setTitle(event.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={content} onChange={(event) => { setContent(event.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ display: "flex"}}>
                            <Form.Label style={{ marginRight: "50px"}}>Bắt đầu
                            <Form.Control type="datetime-local"
                                value={startTime} onChange={(event) => { setStartTime(event.target.value) }} />
                            </Form.Label>
                            
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ display: "flex"}}>
                            <Form.Label>Kết thúc
                            <Form.Control type="datetime-local"
                                value={endTime} onChange={(event) => { setEndTime(event.target.value) }} />
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModel()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitForm()}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModel;