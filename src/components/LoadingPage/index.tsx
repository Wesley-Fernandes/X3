import React from 'react'
import style from './index.module.css'
export default function LoadingPage() {
  return (
    <div className={style.main}>
        <img
            className={style.load}
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt="Carregando..."/>
    </div>
  )
}
