import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
import Home from '@/app/page'
import Login from '@/app/(login)/login/page'
import Signup from '@/app/(login)/signup/page'
import Calendar from '@/app/(account)/calendar/page'
import Guide from '@/app/(account)/(organization/guide/page'
import Members from '@/app/(account)/(organization/members/page'
import Shouts from '@/app/(account)/shouts/page'
import Tasks from '@/app/(account)/tasks/page'

// Make it so that each component is wrapped in a main, update this code to check for main

describe('Loads Home Component', () => {
  it('Checks if home page renders', () => {
    render(<Home />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

// describe('Loads Login Component', () => {
//   it('Checks if login page renders', () => {
//     render(<Login />)
//     const mainElement = screen.getByRole("main");
//     expect(mainElement).toBeInTheDocument();
//   })
// })

describe('Loads Signup Component', () => {
  it('Checks if signup page renders', () => {
    render(<Signup />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

describe('Loads Calendar Component', () => {
  it('Checks if calendar page renders', () => {
    render(<Calendar />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

describe('Loads Guide Component', () => {
  it('Checks if home page renders', () => {
    render(<Guide />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

describe('Loads Members Component', () => {
  it('Checks if members page renders', () => {
    render(<Members />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

describe('Loads Shouts Component', () => {
  it('Checks if shouts page renders', () => {
    render(<Shouts />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})

describe('Loads Tasks Component', () => {
  it('Checks if tasks page renders', () => {
    render(<Tasks />)
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  })
})