import { useQuery, useMutation, useQueryClient } from "react-query";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { getTodos, postTodo, resetTodos } from "@/my-api";
import { useState } from "react";

export default function App() {
  const [value, setInputValue] = useState<string>();
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery("todos", getTodos);

  // Mutations
  const addTodo = useMutation(postTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
      setInputValue("");
    },
  });

  const reset = useMutation(resetTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      setInputValue("");
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My todos</Text>
      <View>
        {query.data?.map((todo) => (
          <Text key={todo.id}>
            <Text>{"\u25CF "}</Text>
            {todo.title}
          </Text>
        ))}
      </View>

      <View style={styles.inputRoot}>
        <TextInput
          placeholder="New todo"
          onChangeText={setInputValue}
          value={value}
        />

        <Button
          title="Add Todo"
          onPress={() => {
            if (value) {
              addTodo.mutate({ id: Date.now(), title: value });
            }
          }}
        />
      </View>
      <Button title="Reset" onPress={() => reset.mutate({})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputRoot: {
    gap: 5,
    width: "60%",
    margin: 20,
  },
});
