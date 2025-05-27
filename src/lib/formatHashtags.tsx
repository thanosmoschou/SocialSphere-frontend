export const formatContent = (content: string) => {
    const words = content.split(' ');
    return words.map((word, index) => {
       if (word.startsWith('#')) {
          return (
             <span 
                key={index} 
                className="horizontal-gradient-secondary text-transparent bg-clip-text"
             >
                {word}{' '}
             </span>
          );
       }
       return <span key={index}>{word}{' '}</span>;
    });
 };