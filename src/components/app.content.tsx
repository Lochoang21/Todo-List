'use client'

import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import CreateModel from './create.model';
import Form from 'react-bootstrap/Form';
import UpdateModel from './update.model';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "@/styles/todolist.css";
import styles from '@/styles/background.module.css';


interface IProps {
  blogs: IBlog[]
}
const AppContent = (props: IProps) => {

  const { blogs } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [currentBlogs, setCurrentBlogs] = useState<IBlog[]>(blogs);
  const [showModelCreate, setShowModelCreate] = useState<boolean>(false);
  const [showModelUpdate, setShowModelUpdate] = useState<boolean>(false);

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Bạn muốn xóa công việc này với id = ${id}`)) {
      fetch(`http://localhost:8000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(res => {
          if (res) {
            toast.success("Delete blog succeed! ");
            // handleCloseModel();
            mutate("http://localhost:8000/todos");
          }
        });
    }
  }

  const handleCheckbox = (item: IBlog, e: any) => {
    console.log("blog >>> ", item)
    console.log("Checked >>> ", e.target.checked)
    handleSubmitForm(item.title, item.content, e.target.checked, item.id, item.startTime, item.endTime);

  }
  const formatTime = (timeString?: string, formatString = 'HH:mm') => {
    if (!timeString) return '';
  
    // Sử dụng thư viện date-fns để định dạng thời gian một cách linh hoạt
    try {
      const date = new Date(timeString);
      return format(date, formatString);
    } catch (error) {
      console.error('Lỗi định dạng thời gian:', error);
      return 'Invalid time format';
    }
  };

  const handleSubmitForm = (title: string, content: string, completed: boolean, id: number, startTime: string,endTime: string ) => {
    let message = "";
    if (!title) {
      toast.error("Not empty title!");
      return false;
    }
    
    if (!content) {
      toast.error("Not empty content!");
      return false;;
    }
    // if (completed === true) {
    //   toast.info("Task marked as completed!");
    // }
    fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, completed, startTime, endTime })
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.info("Hoàn tất!");
          mutate("http://localhost:8000/todos");
        }
      });
    return true;
  }

  const handleCheckboxChange = (id: number) => {
    const updatedBlogs = currentBlogs.map((blog) =>
      blog.id === id ? { ...blog, completed: !blog.completed } : blog
    );
    setCurrentBlogs(updatedBlogs);
    const updatedBlog = updatedBlogs.find(blog => blog.id === id) || null;
    setBlog(updatedBlog);
  };

  useEffect(() => {
    setCurrentBlogs(blogs);

  }, [blogs]);

  return (
    <>
      <div className="mb-3 todo_header">
        <div className='mb-3' style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button className="btn_addTodo" onClick={() => setShowModelCreate(true)}>
            Thêm công việc
          </Button>
        </div>
        <div className={styles.background}>
          <div className={styles.todoContainer}>
            <div>STT</div>
            <div>Tiêu đề</div>
            <div>Nội dung</div>
            <div>Trạng thái</div>
          </div>
          <div className={styles.todoList}>
          {currentBlogs.map((item, index) => (
              <div key={item.id} className={styles.todoContaineritem}>
                 <div>{index + 1}</div> 
                <div className={styles.todoTitle}>
                  <div style={{ display: "flex", alignItems: "center"}}>
                    {item.title}
                  </div>
                </div>
                <div className={styles.contentTodo}>{item.content}
                  <div className= {styles.timeTodo}>
                      <span>{formatTime(item.startTime)}</span> - <span>{formatTime(item.endTime)}</span>
                  </div>
                  
                </div>
                <div className={styles.active}>
                  <Form.Check key={item.id} id={`checkbox-${item.id}`}>
                    <Form.Check.Input
                      type="checkbox"
                      isValid
                      checked={item.completed}
                      onChange={(e) => handleCheckbox(item, e)}
                      
                    />
                  </Form.Check>
                  <Dropdown as={ButtonGroup} className={styles.TodoToggle}>
                      <Dropdown.Toggle  variant="Secondary" id="dropdown-split-basic" />
                      <Dropdown.Menu>
                        <Dropdown.Item as="div">
                          <Link className="btn btn-success" href={`/todolist/${item.id}`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </Link>
                          <Button variant="warning" className="mx-3"
                            onClick={() => {
                              setBlog(item);
                              setShowModelUpdate(true);
                            }}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                          <Button variant="danger" onClick={() => handleDeleteBlog(item.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
              
              </div>
            ))}
          </div>
        </div>

      </div>

      <CreateModel showModelCreate={showModelCreate}
        setShowModelCreate={setShowModelCreate}></CreateModel>

      <UpdateModel showModelUpdate={showModelUpdate}
        setShowModelUpdate={setShowModelUpdate}
        blog={blog}
        setBlog={setBlog}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmitForm={handleSubmitForm}
      />
    </>

  );
}

export default AppContent;