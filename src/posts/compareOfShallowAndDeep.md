---
title: "Shallow Copy Vs Deep Copy In Java"
date: "2019-10-23"
category: java
---

## index

- What Is Cloning?

- Shallow Copy

- Deep Copy

- Shallow Copy Vs Deep Copy In Java

<br>
<br>

# What Is Cloning?

- 메모리에 기존 객체의 사본을 생성하는 프로세스

- java.lang.Object 클래스 의 clone() 메소드 사용

- **기본 clone() 메서드는 Shallow Copy로 사본을 생성**, **Deep Copy로 생성하려면 clone() 메서드를 재정의** 해야 한다.

---

<br>

# Shallow Copy

- 원본 객체에 다른 객체에 대한 참조가 필드로 있는 경우 해당 객체의 참조만 복제 객체에 복사되고 해당 객체의 사본은 생성되지 않는다. **즉, 복제 객체의 변경사항이 원본 객체에 반영된다.**

- Shallow Copy는 원본 객체와 100% 분리되지 않고, 독립적이지도 않다.

```js
class Course
{
    String subject1;

    String subject2;

    String subject3;

    public Course(String sub1, String sub2, String sub3)
    {
        this.subject1 = sub1;

        this.subject2 = sub2;

        this.subject3 = sub3;
    }
}

class Student implements Cloneable
{
    int id;

    String name;

    Course course;

    public Student(int id, String name, Course course)
    {
        this.id = id;

        this.name = name;

        this.course = course;
    }

    //Default version of clone() method. It creates shallow copy of an object.

    protected Object clone() throws CloneNotSupportedException
    {
        return super.clone();
    }
}

public class ShallowCopyInJava
{
    public static void main(String[] args)
    {
        Course science = new Course("Physics", "Chemistry", "Biology");

        Student student1 = new Student(111, "John", science);

        Student student2 = null;

        try
        {
            //Creating a clone of student1 and assigning it to student2

            student2 = (Student) student1.clone();
        }
        catch (CloneNotSupportedException e)
        {
            e.printStackTrace();
        }

        //Printing the subject3 of 'student1'

        System.out.println(student1.course.subject3);         //Output : Biology

        //Changing the subject3 of 'student2'

        student2.course.subject3 = "Maths";

        //This change will be reflected in original student 'student1'

        System.out.println(student1.course.subject3);       //Output : Maths
    }
}
```

- Student 클래스에서 course 필드는 Course 클래스를 참조하는 참조 변수이다. 그렇기 때문에 기본적인 clone을 하게 되면 Shallow copy가 된다. 위 코드에서 처럼 복사본인 student2.course.subject3 값을 변경하면 원본 객체의 값도 변경되는 것을 확인 할 수 있다.

<!-- ![Shallow Copy](/src/img/ShallowCopy.png) -->

---

<br>

# Deep Copy

- Deep Copy는 Shallow Copy와 마찬가지로 원복 객체의 모든 필드를 정확히 복제 한다. 하지만 **Deep Copy는 Shallow Copy와 달리 원복객체와 복제객체가 100% 분리 및 독집적으로 생성이 된다. 즉, 복사 객체에 대한 필드 변경이 이루어져도 원본 객체에 영향을 주지 않는다.**

- Deep Copy를 만드려면 아래 예제와 같이 clone() 메서드를 재정의 해야 한다.

```js
class Course implements Cloneable
{
    String subject1;

    String subject2;

    String subject3;

    public Course(String sub1, String sub2, String sub3)
    {
        this.subject1 = sub1;

        this.subject2 = sub2;

        this.subject3 = sub3;
    }

    protected Object clone() throws CloneNotSupportedException
    {
        return super.clone();
    }
}

class Student implements Cloneable
{
    int id;

    String name;

    Course course;

    public Student(int id, String name, Course course)
    {
        this.id = id;

        this.name = name;

        this.course = course;
    }

    //Overriding clone() method to create a deep copy of an object.

    protected Object clone() throws CloneNotSupportedException
    {
        Student student = (Student) super.clone();

        student.course = (Course) course.clone();

        return student;
    }
}

public class DeepCopyInJava
{
    public static void main(String[] args)
    {
        Course science = new Course("Physics", "Chemistry", "Biology");

        Student student1 = new Student(111, "John", science);

        Student student2 = null;

        try
        {
            //Creating a clone of student1 and assigning it to student2

            student2 = (Student) student1.clone();
        }
        catch (CloneNotSupportedException e)
        {
            e.printStackTrace();
        }

        //Printing the subject3 of 'student1'

        System.out.println(student1.course.subject3);         //Output : Biology

        //Changing the subject3 of 'student2'

        student2.course.subject3 = "Maths";

        //This change will not be reflected in original student 'student1'

        System.out.println(student1.course.subject3);       //Output : Biology
    }
}
```

- Student 클래스에서 참조 객체 필드인 Course 객체도 완벽한 복사본(Deep Copy)를 만들기 위해 Course 클래스의 clone()을 재정의 했다. 그리고 Student 클래스의 clone에서 course.clone(), 즉 Course 객체 복사본을 셋팅한다. 이 후 복사 객체인 student2의 course 필드 값을 변경해도 원본 객체의 값이 그대로 유지되는 것을 볼 수 있다. 원본 객체와 복사 객체가 완전히 독립된 것이다.

---

<br>

# Conclusion

- Shallow Copy는 복사본과 원본 간에 영향을 주는 복사이다.

- Deep Copy는 복사본과 원본이 분리 및 독립된 복사본을 생성한다.

- clone()하는 클래스에 참조 객체 필드가 있는 경우 참조 객체에서 clone()을 재정의 하는 것이 좋아 보인다.

<br><br>

---

# Reference

- https://javaconceptoftheday.com/difference-between-shallow-copy-vs-deep-copy-in-java/
