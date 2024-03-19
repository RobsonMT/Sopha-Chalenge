import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { MotionContainer } from "../../components/MotionContainer";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user, accessToken } = useAuth();
  const { tasks, setTasks, loadTasks } = useTask();

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    setLoading(true);
    loadTasks(user.id, accessToken).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionContainer>
      <Box>
        <Header />
        <SearchBox />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="tasks"
            type="list"
            direction={isWideVersion ? "horizontal" : "vertical"}
          >
            {(provided) => (
              <Grid
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                templateColumns="repeat(auto-fill, minmax(320px , 1fr))"
                placeContent="center"
                gap="10"
                padding="8"
                mt="8"
              >
                <React.Fragment>
                  {loading ? (
                    <Flex w="100vw" justifyContent="center">
                      <Spinner size="xl" />
                    </Flex>
                  ) : (
                    tasks.map((task, index) => (
                      <Card key={task.id} task={task} index={index} />
                    ))
                  )}
                </React.Fragment>

                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </MotionContainer>
  );
};
