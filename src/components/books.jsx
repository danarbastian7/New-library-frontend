import {
  Box,
  HStack,
  Text,
  VStack,
  Stack,
  Image,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react"
// import { Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

const Books = ({
  title,
  author,
  summary,
  publish_year,
  image_url,
  genre,
  price,
}) => {
  return (
    <Box>
      <Stack direction="row">
        <HStack>
          <Image src={image_url} width="150px" />
        </HStack>
        <UnorderedList>
          <ListItem>
            <Text fontFamily={"sans-serif"} fontWeight={"bold"}>
              {title}
            </Text>
          </ListItem>
          <Text fontFamily={"sans-serif"}>{author}</Text>
          <Text fontFamily={"sans-serif"}>{publish_year}</Text>
          <Text fontFamily={"sans-serif"}>{genre}</Text>
          <Text fontFamily={"sans-serif"}>Rp. {price}</Text>
          <Text fontFamily={"sans-serif"}>{summary}</Text>
        </UnorderedList>
      </Stack>
    </Box>
  )
}

export default Books
