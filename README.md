## insta-web

-react-helmet 타이틀변경

## React hook form

-const { register , watch} = useForm() 객체를 먼저 생성해줌 그 후

# register 라는 함수

-보통 리액트에선 input을 통해서 state 를 만들어줘야하고
onChange를 만들어서 value를 설정해줘야하지만 ?
register를 사용하면 간편히사용할수있음 .

- input ref={register}/> 라고만 해놓으면

- ref는 onChange를 대신해주는 value를 준다
# watch  ? 
- watch는 함수이고 value들을 보여줄수있게해주는 함수이다.

!! 이때  input 안에 ref ={register}  라고 명시해준 부분들은 무조건적으로 name이들어가야한다 