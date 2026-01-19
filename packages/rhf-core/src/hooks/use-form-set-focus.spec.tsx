import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormContainer } from '../form'
import { useFormSetFocus } from './use-form-set-focus'

function InputRegister({ defaultValue, name }: { defaultValue?: string; name: string; }) {
  const { register } = useFormContext()
  return <input data-cy={name} defaultValue={defaultValue} {...register(name)} />
}

function FocusButtons() {
  const setFocus = useFormSetFocus({})
  return (
    <div>
      <button data-cy="focus" onClick={() => setFocus('name')} type="button">
        Focus
      </button>
      <button
        data-cy="focus-select"
        onClick={() => setFocus('name', { shouldSelect: true })}
        type="button"
      >
        Focus & Select
      </button>
    </div>
  )
}

describe('useFormSetFocus', () => {
  it('focuses the registered field when setFocus is called', () => {
    cy.mount(
      <FormContainer>
        <InputRegister name="name" />
        <FocusButtons />
      </FormContainer>,
    )

    cy.get('[data-cy=focus]').click()
    cy.get('[data-cy=name]').should('have.focus')
  })

  it('selects the field value when shouldSelect is true', () => {
    cy.mount(
      <FormContainer>
        <InputRegister defaultValue="hello" name="name" />
        <FocusButtons />
      </FormContainer>,
    )

    cy.get('[data-cy=focus-select]').click()

    cy.get('[data-cy=name]').then(($el) => {
      const el = $el[0] as HTMLInputElement
      expect(el.selectionStart).to.equal(0)
      expect(el.selectionEnd).to.equal(el.value.length)
    })
  })
})
