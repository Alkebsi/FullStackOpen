import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <>
      {course.map((value, index) => {
        return <div key={index}>
          <Header courseName={value.name} />
          <Content parts={value.parts} />
          <Total parts={value.parts} />
        </div>;
      })}
    </>
  );

  // return (
  //   <>
  //     <Header courseName={course[0].name} />
  //     <Content parts={course[0].parts} />
  //     <Total parts={course[0].parts} />
  //   </>
  // );
};

export default Course;
