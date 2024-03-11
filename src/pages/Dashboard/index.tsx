import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const { user, accessToken } = useAuth();
  const { tasks, loadTasks } = useTask();

  const [data, setData] = useState(tasks);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  useEffect(() => {
    loadTasks(user.id, accessToken).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Header />
      <SearchBox />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Grid
              ref={provided.innerRef}
              {...provided.droppableProps}
              w="100%"
              templateColumns="repeat(auto-fill, minmax(320px , 1fr))"
              gap="10"
              placeContent="center"
              padding="8"
              mt="8"
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={task.id}
                        task={task}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
