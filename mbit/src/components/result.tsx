import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import results from '../datas/result.json'
import { DevloperType } from '../types'

function Result () {
  const [developer, setDeveloper] = useState<DevloperType | null>(null)

  const getData = async () => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch('http://localhost:3000/result')

      resolve(res.json())
    })
  }

  const getDeveloper = (data: unknown) => {
    const find = results.find((result) => result.pk === data)
    if (find) setDeveloper(find)
  }

  useEffect(() => {
    getData()
    .then((data) => getDeveloper(data))
  }, [])

  return developer ? (
    <Wrapper>
      <Name>{developer.name}</Name>
      <Title>{developer.title}</Title>
      <Image src={developer.img} alt={developer.name} />

      <Features>
        {developer.features.map((feature, idx) => (
          <Feature key={idx}>{feature}</Feature>
        ))}  
      </Features>
    </Wrapper>
  ) : null
}

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 280px;
  margin: 0 auto;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`

const Name = styled.h1`
  
`

const Title = styled.h2`

`

const Image = styled.img`
  padding-top: 36px;
  width: 100%;
  height: 100%;
`

const Features = styled.ul``

const Feature = styled.li``

export default Result
