import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from './../context/AuthContext';

export default function useFetchTodo() {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [todos, setTodos] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setTodos(docSnap.data().todos)
                } else {
                    setTodos({})
                }
            } catch (error) {
                setError('Failed to load Todos')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { loading, error, todos, setTodos }
}
