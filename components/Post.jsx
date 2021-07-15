import Card from '@/components/Card';

const Post = ({className, children }) => (
  <Card color="white" className={className}>
    {children}
  </Card>
);

export default Post;
