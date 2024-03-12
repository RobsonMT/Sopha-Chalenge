import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ITask } from "../../interfaces";

export const Dashboard = () => {
  const [filteredData, setFilteredData] = useState<ITask[]>([]);

  const { user, accessToken } = useAuth();
  const { tasks, loadTasks } = useTask();

  const filterData = (inputValue: string, slug: string) => {
    switch (slug) {
      case "title":
        setFilteredData(
          [...tasks].filter((item) =>
            item.title
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase())
          )
        );
        break;

      case "description":
        setFilteredData(
          [...tasks].filter((item) =>
            item.description
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase())
          )
        );
        break;

      case "priority":
        setFilteredData(
          [...tasks].filter((item) =>
            item.priority
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase())
          )
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    loadTasks(user.id, accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Header />
      <SearchBox filterData={filterData} />
      <Grid
        w="100%"
        templateColumns="repeat(auto-fill, minmax(320px , 1fr))"
        gap="10"
        placeContent="center"
        padding="8"
        mt="8"
      >
        {filteredData.length > 0 ? (
          <React.Fragment>
            {filteredData.map((task) => (
              <Card key={task.id} task={task} />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {tasks.map((task) => (
              <Card key={task.id} task={task} />
            ))}
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
};
