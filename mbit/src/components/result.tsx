import { useEffect, useRef, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import results from '../datas/result.json'
import { DevloperType } from '../types'

function Result () {
  const [developer, setDeveloper] = useState<DevloperType | null>(null)
  const [isDragging, setIsDraging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)
  const [maxWidth, setMaxWidth] = useState<number>(0)
  const swiper = useRef<any>(null)

  const getData = async () => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch('http://3.90.81.98:3000/result')

      resolve(res.json())
    })
  }

  const getDeveloper = (data: unknown) => {
    const find = results.find((result) => result.pk === data)
    if (find) setDeveloper(find)
  }

  const onMouseDown = (event: MouseEvent) => {
    setIsDraging(true)
    setStartX(event.pageX - swiper.current.offsetLeft)
    setScrollLeft(swiper.current.scrollLeft)
    setMaxWidth(swiper.current.clientWidth)
  }

  const onMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      event.preventDefault()
      
      const x = event.pageY - swiper.current.offsetLeft
      const walk = (x - startX) * 3
      swiper.current.scrollLeft = scrollLeft - walk
    }
  }

  const onMouseUp = (event: MouseEvent) => {
    setIsDraging(false)
  }

  const onMouseLeave = (event: MouseEvent) => {
    setIsDraging(false)
  }

  useEffect(() => {
    getData()
    .then((data) => getDeveloper(data))
  }, [])

  useEffect(() => {
    setIsDraging(isDragging)
    setStartX(startX)
    setScrollLeft(scrollLeft)
    setMaxWidth(maxWidth)
  }, [isDragging, startX, scrollLeft, maxWidth])

  return developer ? (
    <Wrapper>
      <Thumbnail>
        <Image src={developer.img} alt={developer.name} />
      </Thumbnail>
      <Contents>
        <Title>
          <Description>{developer.title}</Description>
          <Name>{developer.name}</Name>
        </Title>

        <Features>
          {developer.features.map((feature, idx) => (
            <Feature key={idx} pk={idx + 1}>{feature}</Feature>
          ))}  
        </Features>

        <Others>
            <Text>개발자 리스트</Text>
            <Swiper
              ref={swiper}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              {results.map((result, idx) => (
                <Card key={idx}>
                  <Image src={result.img} alt={result.name} />
                  <OtherName>{result.name}</OtherName>
                </Card>
              ))}
            </Swiper>
        </Others>
      </Contents>

      <Button to="/">Again</Button>
    </Wrapper>
  ) : null
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 280px;
`

const Thumbnail = styled.div`
  padding: 50px 45px;
  background-color: var(--light);
`

const Image = styled.img`
  display: flex;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  object-fit: contain;
`

const Contents = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 18px;
`

const Title = styled.div`
  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--light);
    margin: 18px 0;
  }
`

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 14px;
  padding-bottom: 10px;
`

const Name = styled.h1`
  font-size: 24px;
  font-weight: 900;
`

const Features = styled.ul`
  color: var(--dark-gray);

  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--light);
    margin: 18px 0;
  }
`

const Feature = styled.li<{pk: number}>`
  padding-bottom: 8px;
  font-size: 14px;
  line-height: 1.8;
  &::before {
    content: '${props => props.pk}. ';
  }
`

const Others = styled.div``

const Text = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 18px;
`

const Swiper = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0 -18px;
  padding-left: 18px;
  gap: 8px;
  cursor: grab;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &:active {
    cursor: grabbing;
  }
`

const Card = styled.li`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 6px;
  width: 100px;
  height: 100px;
  background-color: var(--light);
  padding: 8px;
  border-radius: 24px;
  user-select: none;

  > img {
    width: 70px;
    height: 70px;
    user-drag: none; 
  }
`

const OtherName = styled.em`
  font-size: 12px;
`

const Button = styled(Link)`
  max-width: 300px;
  width: 100%;
  height: 40px;
  background-color: var(--primary);
  color: var(--light);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--primary);
  border-radius: 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 36px auto;
`

export default Result
