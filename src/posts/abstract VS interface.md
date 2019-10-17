---
title: "abstract vs interface"
date: "2019-10-17"
category: java
---

## index

- Abstract Classes

- interface

- Abstract Classes Compared to Interfaces(Java 8 )

<br>
<br>

# Abstract Classes

## 1. 무엇인가?

- 실체 클래스들의 `공통적인 특성을 추출해서 선언한 클래스`

  ```js {numberLines: true}
  abstract class Animal { ... } // 추상 클래스

  class Bird extends Animal { ... } // 실체 클래스

  class Insect extends Animal { ... } // 실체 클래스

  class Fish extends Animal { ... } // 실체 클래스
  ```

- 실체 클래스의 공통되는 필드와 메소드를 추출하여 만들었기 때문에 인스턴스 생성 불가

  ```js {numberLines: true}
  Animal animal = new Animal(); // ( X )
  ```

## 2. 왜 사용하는가?

- 공통된 필드와 메소드의 이름을 통일할 목적

  - smartPhone에선 turnOn(), telePhone에선 powerOn() 이라 설계할 수 있다. `동일한 데이터와 기능임에도 불구하고 이름이 다르다 보니 객체마다 사용 방법이 달라지기 때문이다.`

  - 이를 Phone 추상 클래스를 만들어 상속을 받아 쓰도록 하자.

- 실체 클래스 작성시간 절약

  - 공통된 기능 메서드를 상속받기 때문에 코드 작성 시간절약이 가능하다.

## 3. abstract overriding

- 모든 실체들이 가지고 있는 메소드의 실행 내용이 동일하다면 추상 클래스에 메소드를 작성히면 된다. 하지만 실체 클래스마다 `메소드 구현 내용이 다르다면 메소드를 overriding`을 해야 한다.

  ```java
  Animal.class

  public abstract class Animal {
      public String kind;

      public abstract void sound();
  }
  ```

  ```java
  Dog.class

  public class Dog extends Animal {
      public Dog() {
          this.kind = "포유류";
      }

      @Override
      public void sound() {
          System.out.println("멍멍");
      }
  }
  ```

  ```java
  Cat.class

  public class Cat extends Animal {
      public Dog() {
          this.kind = "포유류";
      }

      @Override
      public void sound() {
          System.out.println("야옹");
      }
  }
  ```

  <br>
  <br>

---

# interface

## 1. 무엇인가?

- 객체의 사용 방법을 정의한 타입

- 개발 코드가 인터페이스의 메소드를 호출하면 인터페이스는 객체의 메소드를 호출

## 2. 왜 사용하는가?

- `개발 코드를 수정하지 않고 사용하는 객체를 변경`할 수 있도록 하기 위함이다.

- 하나의 객체를 사용하는 것이 아니라 `여러개의 객체를 사용이 가능하므로 어떤 객체를 사용하느냐에 따라 리턴값이 다를 수 있다.`

## 3. 상세 구현

```js
// Bicycle.interface

interface Bicycle {
    //  wheel revolutions per minute
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);

    // default method
    default void optionOperation(boolean option) {
        if(option) {
            System.out.println("install optoinOperation")
        } else {
            System.out.println("uninstall optoinOperation")
        }
    }
}
```

```js
// ACMEBicycle.class

class ACMEBicycle implements Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

   // The compiler will now require that methods
   // changeCadence, changeGear, speedUp, and applyBrakes
   // all be implemented. Compilation will fail if those
   // methods are missing from this class.

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         System.out.println("cadence:" +
             cadence + " speed:" +
             speed + " gear:" + gear);
    }
```

> | _참고_
>
> > interface 에서 `정의된 추상 메서드를 모두 구현하지 않으면 구현클래스는 abstract로 생성`된다. 인터페이스의 모든 메서드는 기본적으로 public 접근 제한을 갖기 때문에 public보다 더 낮은 접근 제한으로 작성할 수 없기 때문이다.

> | _참고_
>
> > default method는 인터페이스에서 바로 사용할 수 없다. `default method는 추상 메서드가 아닌 인스턴스 메서드`이기 때문에 `구현객체가 있어야 사용할 수 있다.`

> > ```js
> > Bicycle bicycle = new ACMEBicycle();
> > bicycle.optionOperation(true);
> > ```

<br>
<br>

---

# Abstract Classes Compared to Interfaces(Java 8 )

## Abstract Classes vs Interfaces

1. 추상 클래스와 인터페이스는 인스턴스화가 불가능하다.

2. 추상 클래스에서 `static이나 final이 아닌 변수를 지정할 수 있고 public, protected, private 메서드를 가질 수 있다.` 인터페이스는 모든 변수들이 `public static final`이며 모든 메서드는 `public abstract`이다.

3. 인터페이스는 다중상속이 가능하지만 추상 클래스는 다중 상속이 불가능하다.

## Which should you use

- Consider using abstract classes

  - `관련성이 높은 클래스 간에 코드를 공유하고 싶은 경우`

  - 추상 클래스를 상속받은 클래스들이 공통 메서드 및 필드가 많고 public 이외 접근 제어자를 사용하고 싶은 경우

  - non-static, non-final 필드 선언이 필요한 경우

- Consider using interfaces

  - `다중 상속을 허용하고 싶은 경우`

  - `서로 관련성이 없는 클래스들이 인터페이스를 구현하게 되는 경우에 사용한다.` 예를 들어, `Comparable`, `Cloneable` 인터페이스는 여러 클래스들에서 구현되는데, 구현클래스들 간에 관련성이 없는 경우가 대부분이다.

  - 특정 데이터 타입의 행동을 명시하고 싶은데, 어디서 그 행동이 구현되는지는 신경쓰지 않는 경우

<br>
<br>

---

# Conclusion

- Abstract class와 interface의 가장 큰 차이점은 확성성인 것 같다. interface는 다중 상속이 가능하기 때문에 확장에 유리한 이점이 있다. 또한 어느 클래스에서든 구현가능하기 때문에 설계단계에서 확장을 위해서라면 interface를 활용하는 것이 좋아 보인다.

- 반대로 Abstract class는 비록 확장성이 낮지만 공통 메서드 등 공통적인 요소를 정의 하는 클래스를 상속 받음으로서 코드의 중복을 줄일 수 있을 것 같다는 생각이 든다.

<br><br>

---

# Reference

- https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html
- https://docs.oracle.com/javase/tutorial/java/concepts/interface.html
