'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
interface IProps {
    showModelUpdate: boolean;
    setShowModelUpdate: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
    handleCheckboxChange: (id: number) => void;
    handleSubmitForm:(title:string, content:string, completed:boolean, id: number, startTime: string,endTime: string ) =>boolean
}
function UpdateModel(props: IProps) {
    const { showModelUpdate, setShowModelUpdate, blog, setBlog, handleCheckboxChange,handleSubmitForm } = props;

    const [id, setID] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    useEffect(() => {
        if (blog && blog.id) {
            setID(blog.id);
            setTitle(blog.title);
            setContent(blog.content);
            setCompleted(blog.completed);
            setStartTime(blog.startTime);
            setEndTime(blog.endTime);
        }
    }, [blog])


    const handleCloseModel = () => {
        setTitle("");
        setContent("");
        setStartTime("");
        setEndTime("");
        setBlog(null);
        setShowModelUpdate(false);
    }

    const handleSubmitFormUpdate = () => {
     const flag = handleSubmitForm(title, content, completed, id, startTime, endTime)
     console.log("flag >>> ",flag)   
     if (flag) {
            handleCloseModel()
        }
    }

    // const handleCheckboxClick = () => {
    //     setCompleted(!completed);
    //     if (blog) {
    //         handleCheckboxChange(blog.id); // gọi hàm thay đổi trạng thái completed
    //     }
    // };
    return (
        <>
            <Modal
                show={showModelUpdate}
                onHide={() => handleCloseModel()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa công việc</Modal.Title>
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
                        {/* Nút toggle cho trạng thái completed */}
                        <Form.Group className="mb-3">
                            <Form.Label>Bắt đầu</Form.Label>
                            <Form.Control type="datetime-local"
                                value={startTime} onChange={(event) => { setStartTime(event.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kết thúc</Form.Label>
                            <Form.Control type="datetime-local"
                                value={endTime} onChange={(event) => { setEndTime(event.target.value) }} />
                        </Form.Group>

                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModel()}>
                        Đóng
                    </Button>
                    <Button variant="info" onClick={() => handleSubmitFormUpdate()}>Cập nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModel;